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
        public void GetParticipants(int id)
        {
            ICollection<UserDTO> participants = BusinessLogic.GetParticipants(id);
            Clients.Caller.getParticipants(participants);
        }

        public void GetPBIs(int id)
        {
            ICollection<ProductBacklogItemDTO> pbis = BusinessLogic.GetPBIs(id);
            Clients.Caller.getPBIs(pbis);
        }

        public void CreateRoom(string scrumMasterName)
        {
            int id = BusinessLogic.CreateRoom(scrumMasterName, Context.ConnectionId);
            Clients.Caller.roomCreated(id);

            ICollection<UserDTO> participants = BusinessLogic.GetParticipants(id);
            Clients.Caller.getParticipants(participants); 
        }

        public void CreatePBI(int id, string title)
        {
            Boolean hasAdded = BusinessLogic.CreatePBI(id, title);
            Clients.Caller.pushedPBI(hasAdded);
        }

        public void RemovePBI(int id, string title)
        {
            Boolean hasBeenRemoved = BusinessLogic.RemovePBI(id, title);
            Clients.Caller.pushedPBI(hasBeenRemoved);
        }

        public void JoinRoom(string name, int id)
        {
            Boolean hasJoined = BusinessLogic.JoinRoom(name, id, Context.ConnectionId);
            Clients.Caller.roomJoined(hasJoined);

            ICollection<UserDTO> participants = BusinessLogic.GetParticipants(id);
            Clients.All.getParticipants(participants); 
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            int id = BusinessLogic.RemoveUser(Context.ConnectionId);
            ICollection<UserDTO> participants = BusinessLogic.GetParticipants(id);
            Clients.All.getParticipants(participants);
            return null;
        }
    }
}
