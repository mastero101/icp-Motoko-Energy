import { AuthClient } from "@dfinity/auth-client";
import { icp_hello_world_motoko_backend } from "../../declarations/icp_hello_world_motoko_backend";

let authClient;
let userPrincipal;

// Initialize the AuthClient and handle login
async function initAuthClient() {
  authClient = await AuthClient.create();
  
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    document.getElementById("loginButton").addEventListener("click", async () => {
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => handleAuthenticated(authClient),
      });
    });
  }
}

function handleAuthenticated(authClient) {
  const identity = authClient.getIdentity();
  userPrincipal = identity.getPrincipal().toText();
  document.getElementById("userId").innerText = `Logged in as: ${userPrincipal}`;
  document.getElementById("loginButton").style.display = "none";
  document.getElementById("logoutButton").style.display = "inline-block";
  document.getElementById("name").value = userPrincipal;
  document.getElementById("name").disabled = true;
  document.getElementById("clientId").value = userPrincipal;
  document.getElementById("clientId").disabled = true;
  document.getElementById("clientIdConsumption").value = userPrincipal;
  document.getElementById("clientIdConsumption").disabled = true;
}

async function handleLogout() {
  await authClient.logout();
  userPrincipal = null;
  document.getElementById("userId").innerText = "";
  document.getElementById("loginButton").style.display = "inline-block";
  document.getElementById("logoutButton").style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("name").disabled = false;
  document.getElementById("clientId").value = "";
  document.getElementById("clientId").disabled = false;
  document.getElementById("clientIdConsumption").value = "";
  document.getElementById("clientIdConsumption").disabled = false;
  window.location.reload();
}

// Function to register a new client
async function registerClient(e) {
  e.preventDefault();
  const button = e.target.querySelector("button");
  button.setAttribute("disabled", true);

  const name = userPrincipal; // Use the principal ID as the client ID
  try {
    const result = await icp_hello_world_motoko_backend.registrarCliente(name);
    document.getElementById("greeting").innerText = result;
    console.log("Usuario " + name);
  } catch (error) {
    console.error("Error registering client:", error);
  } finally {
    button.removeAttribute("disabled");
    getClients(); // Refresh the clients list
  }
}

// Function to register a new device
async function registerDevice(e) {
  e.preventDefault();
  const button = e.target.querySelector("button");
  button.setAttribute("disabled", true);

  const clientId = document.getElementById("clientId").value.toString();
  const deviceId = document.getElementById("deviceId").value.toString();
  const amperios = parseInt(document.getElementById("amperios").value, 10);

  try {
    const result = await icp_hello_world_motoko_backend.registrarDispositivo(clientId, deviceId, amperios);
    document.getElementById("greeting").innerText = result;
  } catch (error) {
    console.error("Error registering device:", error);
  } finally {
    button.removeAttribute("disabled");
    getClients(); // Refresh the clients list
  }
}

// Function to register energy consumption
async function registerConsumption(e) {
  e.preventDefault();
  const button = e.target.querySelector("button");
  button.setAttribute("disabled", true);

  const clientId = document.getElementById("clientIdConsumption").value.toString();
  const consumedEnergy = parseInt(document.getElementById("consumedEnergy").value, 10);
  const producedEnergy = parseInt(document.getElementById("producedEnergy").value, 10);

  try {
    const result = await icp_hello_world_motoko_backend.registrarConsumo(clientId, consumedEnergy, producedEnergy);
    document.getElementById("greeting").innerText = result;
  } catch (error) {
    console.error("Error registering consumption:", error);
  } finally {
    button.removeAttribute("disabled");
    getClients(); // Refresh the clients list
  }
}

// Function to convert BigInt values to strings for display purposes
function convertBigIntToString(obj) {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, convertBigIntToString(v)])
    );
  } else {
    return obj;
  }
}

// Function to format device information
function formatDevices(devices, clientId) {
  return devices.map(device => {
    if (device[0] && device[0].id && device[0].amperios !== undefined) {
      return `
        <div>
          ${device[0].id} - ${device[0].amperios} Amps
          <button class="delete-device-btn" data-client-id="${clientId}" data-device-id="${device[0].id}">Eliminar</button>
        </div>
      `;
    } else if (device[0] && device[0].id) {
      return `
        <div>
          ${device[0].id}
          <button class="delete-device-btn" data-client-id="${clientId}" data-device-id="${device[0].id}">Eliminar</button>
        </div>
      `;
    } else {
      return "No devices registered";
    }
  }).join(', ');
}

// Function to get the list of clients
async function getClients() {
  const button = document.querySelector("#getClients");
  button.setAttribute("disabled", true); // Disable the button to prevent duplicate clicks

  const clientsList = document.getElementById("clientsTable");
  clientsList.innerHTML = ""; // Clear the current table before adding new data

  try {
    const clients = await icp_hello_world_motoko_backend.obtenerClientes();
    const convertedClients = clients.map(convertBigIntToString);

    const table = document.createElement("table");
    table.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Balance</th>
        <th>Energía Consumida</th>
        <th>Energía Aportada</th>
        <th>Dispositivos</th>
        <th>Acciones</th>
      </tr>
    `;

    convertedClients.forEach(client => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${client.id}</td>
        <td>${client.balance}</td>
        <td>${client.energiaConsumida}</td>
        <td>${client.energiaAportada}</td>
        <td>${formatDevices(client.dispositivos, client.id)}</td>
        <td><button class="delete-client-btn" data-client-id="${client.id}">Eliminar</button></td>
      `;
      table.appendChild(row);
    });

    clientsList.appendChild(table);

    // Event listener for delete client buttons
    document.querySelectorAll(".delete-client-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const clientId = btn.getAttribute("data-client-id");
        if (confirm(`¿Estás seguro de que deseas eliminar al cliente con ID: ${clientId}`)) {
          try {
            await icp_hello_world_motoko_backend.eliminarCliente(clientId);
            getClients(); // Refresh the clients list
          } catch (error) {
            console.error("Error deleting client:", error);
          }
        }
      });
    });

    // Event listener for delete device buttons
    document.querySelectorAll(".delete-device-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const clientId = btn.getAttribute("data-client-id");
        const deviceId = btn.getAttribute("data-device-id");
        if (confirm(`¿Estás seguro de que deseas eliminar el dispositivo con ID: ${deviceId} del cliente con ID: ${clientId}?`)) {
          try {
            const result = await icp_hello_world_motoko_backend.eliminarDispositivo(clientId, deviceId);
            document.getElementById("greeting").innerText = result;
            getClients(); // Refresh the clients list
          } catch (error) {
            console.error("Error deleting device:", error);
          }
        }
      });
    });

  } catch (error) {
    console.error("Error getting clients:", error);
  } finally {
    button.removeAttribute("disabled");
  }
}

// Initialize the app
initAuthClient();

// Event listener for the logout button
document.getElementById("logoutButton").addEventListener("click", handleLogout);

// Event listener for the register client form
document.getElementById("clientForm").addEventListener("submit", registerClient);

// Event listener for the register device form
document.getElementById("deviceForm").addEventListener("submit", registerDevice);

// Event listener for the register consumption form
document.getElementById("consumptionForm").addEventListener("submit", registerConsumption);

// Event listener for the get clients button
document.getElementById("getClients").addEventListener("click", getClients);