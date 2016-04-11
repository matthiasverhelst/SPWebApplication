using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SPCore;
using SPCore.DTO;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ScrumPokerService.Hubs
{
    // This hub has no inbound APIs, since all inbound communication is done
    // via the HTTP API. It's here for clients which want to get continuous
    // notification of changes to the ToDo database.
    [HubName("scrumPokerHub")]
    public class ScrumPokerHub : Hub {
        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }

        public void CreateRoom(string scrumMasterName)
        {
            int id = BusinessLogic.CreateRoom(scrumMasterName);
            Clients.Caller.roomCreated(id);
        }

        public void JoinRoom(string name, int id)
        {
            Boolean hasJoined = BusinessLogic.JoinRoom(name, id);
            Clients.Caller.roomJoined(hasJoined);

            ICollection<UserDTO> participants = BusinessLogic.GetParticipants(id);
            Clients.All.getParticipants(participants);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            ICollection<UserDTO> participants = BusinessLogic.GetParticipants(123);
            Clients.All.getParticipants(participants);
            return null;
        }
    }
}
