using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPCore.Interfaces;
using SPCore.DTO;

namespace SPCore
{
    public class BusinessLogic
    {        
        private static ICollection<RoomDTO> rooms = new List<RoomDTO>();

        public static int CreateRoom(String scrumMasterName, String connectionId)
        {
            UserDTO scrumMaster = new UserDTO()
            {
                Name = scrumMasterName,
                ConnectionId = connectionId
            };

            RoomDTO room = new RoomDTO()
            {
                ScrumMaster = scrumMaster,
                RoomId = new Random().Next(1000, 9999)
            };

            /* Do we need to add the scrumMaster to the users list? */
            ICollection<UserDTO> participants = new List<UserDTO>();
            participants.Add(scrumMaster);

            room.Participants = participants;

            rooms.Add(room);

            return room.RoomId;
        }

        public static ICollection<UserDTO> GetParticipants(int id)
        {
            foreach (var room in rooms)
            {
                if (room.RoomId == id)
                {
                    return room.Participants;
                }
            }
            return null;
        }

        public static Boolean JoinRoom(String name, int id, String connectionId)
        {
            UserDTO user = new UserDTO()
            {
                Name = name,
                ConnectionId = connectionId
            };

            foreach (var room in rooms)
            {
                if (room.RoomId == id)
                {
                    room.Participants.Add(user);
                    return true;
                }
            }
            return false;
        }

        public static int RemoveUser(String connectionId)
        {
            foreach (var room in rooms)
            {
                foreach (var user in room.Participants)
                {
                    if (user.ConnectionId.Equals(connectionId))
                    {
                        room.Participants.Remove(user);
                        return room.RoomId;
                    }
                }
            }
            //throw new Exception("User that was disconnecting not found!");
            return 0;
        }

        public static bool CreatePBI(int id, string title)
        {
            foreach (var room in rooms)
            {
                if (room.RoomId == id)
                {
                    ProductBacklogItemDTO pbi = new ProductBacklogItemDTO()
                    {
                        Title = title,
                        Room = room
                    };
                    room.PBIs.Add(pbi);
                    return true;
                }
            }
            return false;
        }

        public static bool RemovePBI(int id, string title)
        {
            foreach (var room in rooms)
            {
                if (room.RoomId == id)
                {
                    foreach (var pbi in room.PBIs)
                    {
                        if (pbi.Title == title)
                        {
                            room.PBIs.Remove(pbi);
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }
}
