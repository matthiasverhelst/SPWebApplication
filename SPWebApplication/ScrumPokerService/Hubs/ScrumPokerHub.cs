using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SPCore;
using SPCore.Model;
using ScrumPokerService.DTO;

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
            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            Clients.Caller.getParticipants(participants);
        }

        public void GetPBIs(int id)
        {
            ICollection<ProductBacklogItem> pbis = BusinessLogic.GetPBIs(id);
            Clients.Caller.getPBIs(pbis);
        }

        public async Task CreateRoom(string scrumMasterName)
        {
            int id = BusinessLogic.CreateRoom(scrumMasterName, Context.ConnectionId);
            Clients.Caller.roomCreated(id);

            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            await Groups.Add(Context.ConnectionId, id.ToString());
            Clients.Group(id.ToString()).getParticipants(participants); 
        }

        public void PushPBI(int id, string pbiName)
        {
            Clients.Group(id.ToString()).pbiPushed(pbiName);
        }

        public void CreatePBI(int id, string title)
        {
            Boolean hasAdded = BusinessLogic.CreatePBI(id, title);
            Clients.Caller.createdPBI(hasAdded);
        }

        public void AddEstimation(int id, AddEstimateDTO addEstimateDTO)
        {
            Boolean isAdded = BusinessLogic.AddEstimate(id, addEstimateDTO.PBIName, addEstimateDTO.Estimate);
            Clients.Caller.addedEstimation(isAdded);
        }

        public void RemovePBI(int id, string title)
        {
            Boolean hasBeenRemoved = BusinessLogic.RemovePBI(id, title);
            Clients.Caller.removedPBI(hasBeenRemoved);
        }

        public async Task JoinRoom(JoinRoomDTO joinRoomDTO)
        {
            int id = joinRoomDTO.RoomId;
            string name = joinRoomDTO.Name;
            Boolean hasJoined = BusinessLogic.JoinRoom(name, id, Context.ConnectionId);
            Clients.Caller.roomJoined(hasJoined);

            if (hasJoined)
            {
                await Groups.Add(Context.ConnectionId, id.ToString());
                ICollection<User> participants = BusinessLogic.GetParticipants(id);
                Clients.Group(id.ToString()).getParticipants(participants); 
            }           
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            int id = BusinessLogic.RemoveUser(Context.ConnectionId);
            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            Clients.Group(id.ToString()).getParticipants(participants);
            return null;
        }
    }
}
