using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SPCore;
using SPCore.Model;
using ScrumPokerService.DTO;
using ScrumPokerService.Converters;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Diagnostics;
namespace ScrumPokerService.Hubs
{
    [HubName("scrumPokerHub")]
    public class ScrumPokerHub : Hub {
        public void GetParticipants(int id)
        {
            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            Clients.Caller.getParticipants(participants);



            String logText = "Get participants from room  " + id + " list asked by  " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + "), response: " + String.Join("; ", participants);
            Trace.WriteLine(logText, "GetParticipants");
        }

        public async Task CreateRoom(string scrumMasterName)
        {
            int id = BusinessLogic.CreateRoom(scrumMasterName, Context.ConnectionId);
            Clients.Caller.roomCreated(id);

            String logText = "Room with id " + id + " created by " + scrumMasterName + "("+ Context.ConnectionId + ")";
            Trace.WriteLine(logText, "CreateRoom");

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
                hasJoined = BusinessLogic.JoinRoom(name, id, Context.ConnectionId, joinRoomDTO.IsScrumMaster);
            }
            RoomJoinedDTO roomJoinedDTO = new RoomJoinedDTO
            {
                Success = hasJoined,
                RoomId = id,
                UserName = joinRoomDTO.Name,
                IsScrumMaster = joinRoomDTO.IsScrumMaster
            };
            Clients.Caller.roomJoined(roomJoinedDTO);       

            if (hasJoined)
            {
                await Groups.Add(Context.ConnectionId, id.ToString());
                ICollection<User> participants = BusinessLogic.GetParticipants(id);
                Clients.Group(id.ToString()).getParticipants(participants);

                String logText = "Room joined with id " + roomJoinedDTO.RoomId + " created by " + roomJoinedDTO.UserName + "(" + Context.ConnectionId + ")";
                Trace.WriteLine(logText, "JoinRoom");
            }
        }

        public void GetPBIs(int id)
        {
            ICollection<ProductBacklogItem> pbis = BusinessLogic.GetPBIs(id);
            Clients.Caller.getPBIs(pbis);

            String logText = "PBI's from room " + id + " requested by  " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "GetPBIs");
        }

        public void PushPBI(int id, string pbiName)
        {
            BusinessLogic.RemoveEstimates(id, pbiName);
            BusinessLogic.setRoomState(id, RoomState.Voting);
            Clients.Group(id.ToString()).pbiPushed(pbiName);

            String logText = "PBI with name " + pbiName + " PUSHED in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "PushPBI");
        }

        public void CreatePBI(int id, string title)
        {
            Boolean hasAdded = BusinessLogic.CreatePBI(id, title);
            Clients.Caller.createdPBI(hasAdded);

            String logText = "PBI with name" + title + " CREATED in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "CreatePBI");
        }

        public void UpdatePBI(int id, UpdatePBIDTO updateDTO)
        {
            Boolean isUpdated = BusinessLogic.UpdatePBI(id, updateDTO.OldTitle, updateDTO.NewTitle);
            Clients.Group(id.ToString()).updatedPBI(isUpdated);

            String logText = "PBI changed name from " + updateDTO.OldTitle + " to " + updateDTO.NewTitle + " UPDATED in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "UpdatePBI");
        }

        public void RemovePBI(int id, string title)
        {
            Boolean hasBeenRemoved = BusinessLogic.RemovePBI(id, title);
            Clients.Caller.removedPBI(hasBeenRemoved);

            String logText = "PBI with name" + title + " REMOVED in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "RemovePBI");
        }

        public void AddEstimation(int id, AddEstimateDTO addEstimateDTO)
        {
            Boolean isAdded = BusinessLogic.AddEstimate(id, Context.ConnectionId, addEstimateDTO.PBIName, addEstimateDTO.Estimate);
            Boolean everyoneVoted = BusinessLogic.checkEveryoneVoted(id, addEstimateDTO.PBIName);
            Clients.Caller.addedEstimation(isAdded);
            if (everyoneVoted)
            {
                Clients.Group(id.ToString()).showEstimates();
            }

            Clients.Group(id.ToString()).getUserEstimates(FindUserEstimates(id, addEstimateDTO.PBIName));

            String logText = "Add estimate '" + addEstimateDTO.Estimate + "' for " + addEstimateDTO.PBIName + " in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "AddEstimation");
        }

        public void GetUserEstimates(int id, string title)
        {
            Clients.Caller.getUserEstimates(FindUserEstimates(id, title));

            String logText = "Get user estimates for " + title +  " in room " + id +" by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "GetUserEstimates");
        }

        public void ShowEstimates(int id)
        {
            BusinessLogic.setRoomState(id, RoomState.Results);
            Clients.Group(id.ToString()).showEstimates();

            String logText = "Show Estimates in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "ShowEstimates");
        }

        public void SetFinalEstimate(int id, AddEstimateDTO finalEstimate)
        {
            Boolean isAdded = BusinessLogic.SetFinalEstimate(id, finalEstimate.PBIName, finalEstimate.Estimate);
            if (isAdded)
            {
                BusinessLogic.setRoomState(id, RoomState.FinalEstimate);
                Clients.Group(id.ToString()).finalEstimateSet(finalEstimate.Estimate);

                String logText = "Final Estimate of " + finalEstimate.PBIName + " is SET in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
                Trace.WriteLine(logText, "SetFinalEstimate");
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

            String logText = "Get Final Estimate of " + title + " in room " + id + " by " + BusinessLogic.GetUserNameByConnectionId(id, Context.ConnectionId) + "(" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "SetFinalEstimate");
        }
        //SAM
        public void AbortVoting(int id)
        {
            String logText = "Voting in room " + id + " is aborted.";
            Trace.WriteLine(logText, "AbortVoting");

            Clients.Group(id.ToString()).votingAborted();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            String logText = "User (" + Context.ConnectionId + ") disconnected";
            Trace.WriteLine(logText, "OnDisconnected");

            int roomId = BusinessLogic.RemoveUser(Context.ConnectionId);
            ICollection<User> participants = BusinessLogic.GetParticipants(roomId);

            if (participants != null && participants.Count == 0)
                BusinessLogic.RemoveRoom(roomId);
            else
                Clients.Group(roomId.ToString()).getParticipants(participants);

            return null;
        }

        public void RemoveUser()
        {
            String logText = "Removing user (" + Context.ConnectionId + ")";
            Trace.WriteLine(logText, "RemoveUser");

            OnDisconnected(false);
        }

        public async Task ReconnectEvent(string roomId, string userName, bool isScrumMaster)
        {
            String logText = "User " + userName + " ("+ Context.ConnectionId + ") is trying to reconnect to room " + roomId + " as scrummaster: " + isScrumMaster;
            Trace.WriteLine(logText, "Reconnect");

            JoinRoomDTO joinRoomDTO = new JoinRoomDTO()
            {
                RoomId = roomId,
                Name = userName,
                IsScrumMaster = isScrumMaster
            };
            await JoinRoom(joinRoomDTO);
        }

        private ICollection<UserEstimateDTO> FindUserEstimates(int id, string title)
        {
            ICollection<User> participants = BusinessLogic.GetParticipants(id);
            ICollection<Estimate> estimates = BusinessLogic.GetEstimates(id, title);
            return ConvertersDTO.ConvertToUserEstimates(participants, estimates);
        }
    }
}
