import Nat "mo:base/Nat";
import List "mo:base/List";
import Int "mo:base/Int";

actor {

    type Device = {
        id: Text;
        amperios: Nat;
    };

    type Cliente = {
        id: Text;
        dispositivos: List.List<Device>;
        energiaConsumida: Nat;
        energiaAportada: Nat;
        balance: Int;
    };

    var clientes : List.List<Cliente> = List.nil<Cliente>();

    public shared func registrarCliente(id: Text) : async Text {
        let cliente: Cliente = {
            id = id;
            dispositivos = List.nil<Device>();
            energiaConsumida = 0;
            energiaAportada = 0;
            balance = 0;
        };
        clientes := List.push(cliente, clientes);
        return "Cliente registrado con éxito.";
    };

    public shared func registrarDispositivo(idCliente: Text, idDispositivo: Text, amperios: Nat) : async Text {
        let clienteOpt = List.find<Cliente>(clientes, func(cliente) { cliente.id == idCliente });
        switch (clienteOpt) {
            case (null) { return "Cliente no encontrado."; };
            case (?cliente) {
                let dispositivo: Device = { id = idDispositivo; amperios = amperios };
                let dispositivosActualizados = List.push(dispositivo, cliente.dispositivos);
                let clienteActualizado = {
                    id = cliente.id;
                    dispositivos = dispositivosActualizados;
                    energiaConsumida = cliente.energiaConsumida;
                    energiaAportada = cliente.energiaAportada;
                    balance = cliente.balance;
                };
                clientes := List.map<Cliente, Cliente>(clientes, func(c: Cliente) : Cliente {
                    if (c.id == idCliente) clienteActualizado else c
                });
                return "Dispositivo registrado con éxito.";
            };
        }
    };

    public shared func registrarConsumo(idCliente: Text, energiaConsumida: Nat, energiaAportada: Nat) : async Text {
    let clienteOpt = List.find<Cliente>(clientes, func(cliente) { cliente.id == idCliente });
    switch (clienteOpt) {
        case (null) { return "Cliente no encontrado."; };
        case (?cliente) {
          let nuevaEnergiaConsumida = cliente.energiaConsumida + energiaConsumida;
          let nuevaEnergiaAportada = cliente.energiaAportada + energiaAportada;
          let nuevoBalance = nuevaEnergiaAportada - nuevaEnergiaConsumida;
          let clienteActualizado = {
              id = cliente.id;
              dispositivos = cliente.dispositivos;
              energiaConsumida = nuevaEnergiaConsumida;
              energiaAportada = nuevaEnergiaAportada;
              balance = nuevoBalance;
          };
              clientes := List.map<Cliente, Cliente>(clientes, func(c: Cliente) : Cliente {
                  if (c.id == idCliente) clienteActualizado else c
          });
          return "Consumo registrado con éxito.";
        };
      }
    };


    public query func obtenerCliente(idCliente: Text) : async ?Cliente {
        return List.find<Cliente>(clientes, func(cliente) { cliente.id == idCliente });
    };

    public query func obtenerClientes() : async [Cliente] {
        return List.toArray(clientes);
    };

    public shared func eliminarCliente(idCliente: Text) : async Text {
    let clienteOpt = List.find<Cliente>(clientes, func(cliente) { cliente.id == idCliente });
    switch (clienteOpt) {
        case (null) { return "Cliente no encontrado."; };
        case (?cliente) {
            clientes := List.filter<Cliente>(clientes, func(c: Cliente) : Bool {
                c.id != idCliente
            });
            return "Cliente eliminado con éxito.";
            };
        }
    };

    public shared func eliminarDispositivo(idCliente: Text, idDispositivo: Text) : async Text {
        if (idDispositivo == "") {
            return "El ID del dispositivo no puede estar vacío.";
        };

        let clienteOpt = List.find<Cliente>(clientes, func(cliente) { cliente.id == idCliente });
        switch (clienteOpt) {
            case (null) { return "Cliente no encontrado."; };
            case (?cliente) {
                let dispositivoOpt = List.find<Device>(cliente.dispositivos, func(d: Device) { d.id == idDispositivo });
                switch (dispositivoOpt) {
                    case (null) { return "Dispositivo no encontrado."; };
                    case (?_) {
                        let dispositivosActualizados = List.filter<Device>(cliente.dispositivos, func(d: Device) : Bool {
                            d.id != idDispositivo
                        });
                        let clienteActualizado = {
                            id = cliente.id;
                            dispositivos = dispositivosActualizados;
                            energiaConsumida = cliente.energiaConsumida;
                            energiaAportada = cliente.energiaAportada;
                            balance = cliente.balance;
                        };
                        clientes := List.map<Cliente, Cliente>(clientes, func(c: Cliente) : Cliente {
                            if (c.id == idCliente) clienteActualizado else c
                        });
                        return "Dispositivo eliminado con éxito.";
                    };
                }
            };
        }
    };
};