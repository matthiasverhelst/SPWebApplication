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
            int id;
            Boolean hasJoined = false;
            if (Int32.TryParse(joinRoomDTO.RoomId, out id))
            {
                string name = joinRoomDTO.Name;
                hasJoined = BusinessLogic.JoinRoom(name, id, Context.ConnectionId);
            }
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
            BusinessLogic.RemoveEstimates(id, pbiName);
            Clients.Group(id.ToString()).pbiPushed(pbiName);
        }

        public void CreatePBI(int id, string title)
        {
            Boolean hasAdded = BusinessLogic.CreatePBI(id, title);
            Clients.Caller.createdPBI(hasAdded);
        }

        public void UpdatePBI(int id, UpdatePBIDTO updateDTO)
        {
            Boolean isUpdated = BusinessLogic.UpdatePBI(id, updateDTO.OldTitle, updateDTO.NewTitle);
            Clients.Group(id.ToString()).updatedPBI(isUpdated);
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

        public void SetFinalEstimate(int id, AddEstimateDTO finalEstimate)
        {
            Boolean isAdded = BusinessLogic.SetFinalEstimate(id, finalEstimate.PBIName, finalEstimate.Estimate);
            if (isAdded) 
            {
                Clients.Group(id.ToString()).finalEstimateSet(finalEstimate.Estimate);
            }
            else
            {
                Clients.Group(id.ToString()).finalEstimateSet(false);
            }
        }

        public void GetFinalEstimate(int id, string title)
        {
            string finalEstimate = BusinessLogic.GetFinalEstimate(id, title);
            Clients.Caller.getFinalEstimate(finalEstimate);
        }

        public void AbortVoting(int id)
        {
            Clients.Group(id.ToString()).votingAborted();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            int roomId = BusinessLogic.RemoveUser(Context.ConnectionId);
            ICollection<User> participants = BusinessLogic.GetParticipants(roomId);

            if (participants.Count == 0)
                BusinessLogic.RemoveRoom(roomId);
            else
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
