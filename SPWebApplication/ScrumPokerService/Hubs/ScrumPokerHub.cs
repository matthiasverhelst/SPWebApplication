using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SPCore;

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
            Clients.Caller.roomCreated(BusinessLogic.CreateRoom(scrumMasterName));
        }

        public void JoinRoom(string name, int id)
        {
            BusinessLogic.JoinRoom(name, id);
        }
    }
}
