using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SPCore;
using SPCore.Model;
using ScrumPokerService.DTO;
using ScrumPokerService.Converters;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ScrumPokerService.Hubs
{
    [HubName("scrumPokerHub")]
    public class ScrumPokerHub : Hub {
        public void GetParticipants(int id)
        {
            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            Clients.Caller.getParticipants(participants);
        }

        public async Task CreateRoom(string scrumMasterName)
        {
            int id = BusinessLogic.CreateRoom(scrumMasterName, Context.ConnectionId);
            Clients.Caller.roomCreated(id);

            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            await Groups.Add(Context.ConnectionId, id.ToString());
            Clients.Group(id.ToString()).getParticipants(participants); 
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

        public void GetPBIs(int id)
        {
            ICollection<ProductBacklogItem> pbis = BusinessLogic.GetPBIs(id);
            Clients.Caller.getPBIs(pbis);
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

        public void RemovePBI(int id, string title)
        {
            Boolean hasBeenRemoved = BusinessLogic.RemovePBI(id, title);
            Clients.Caller.removedPBI(hasBeenRemoved);
        }

        public void AddEstimation(int id, AddEstimateDTO addEstimateDTO)
        {
            Boolean isAdded = BusinessLogic.AddEstimate(id, Context.ConnectionId, addEstimateDTO.PBIName, addEstimateDTO.Estimate);
            Clients.Caller.addedEstimation(isAdded);
            Clients.Group(id.ToString()).getUserEstimates(FindUserEstimates(id, addEstimateDTO.PBIName));
        }

        public void GetUserEstimates(int id, string title)
        {
            Clients.Caller.getUserEstimates(FindUserEstimates(id, title));
        }

        public void ShowEstimates(int id)
        {
            Clients.Group(id.ToString()).showEstimates();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            int roomId = BusinessLogic.RemoveUser(Context.ConnectionId);
            ICollection<User> participants = BusinessLogic.GetParticipants(roomId);
            Clients.Group(roomId.ToString()).getParticipants(participants);
            return null;
        }

        private ICollection<UserEstimateDTO> FindUserEstimates(int id, string title)
        {
            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            ICollection<Estimate> estimates = BusinessLogic.GetEstimates(id, title);
            return ConvertersDTO.ConvertToUserEstimates(participants, estimates);
        }
    }
}
