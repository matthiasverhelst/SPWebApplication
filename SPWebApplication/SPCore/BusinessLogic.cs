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
		private static ICollection<Room> _rooms = new List<Room>();

		public static int CreateRoom(String scrumMasterName, String connectionId)
		{
			User scrumMaster = new User()
			{
				Name = scrumMasterName,
				ConnectionId = connectionId
			};

			Room room = new Room()
			{
				ScrumMaster = scrumMaster,
				RoomId = GenerateRoomId(),
				Participants = new List<User>(),
				PBIs = new List<ProductBacklogItem>()
			};

			/* Do we need to add the scrumMaster to the users list? */
			room.Participants.Add(scrumMaster);

			_rooms.Add(room);

			return room.RoomId;
		}

		private static int GenerateRoomId()
		{
			int result;
			var random = new Random();

			do
			{
				result = random.Next(1000, 9999);
			} while (_rooms.Where(r => r.RoomId == result).Any());

			return result;
		}

		public static ICollection<User> GetParticipants(int id)
		{
			var room = _rooms.Where(r => r.RoomId == id).FirstOrDefault();
			
			if(room != null)
			{
				return room.Participants;
			}

			return null;
		}

		public static ICollection<ProductBacklogItem> GetPBIs(int id)
		{
			var room = _rooms.Where(r => r.RoomId == id).FirstOrDefault();

			if (room != null)
			{
				return room.PBIs;
			}

			return null;
		}

		public static Boolean JoinRoom(String name, int id, String connectionId)
		{
			User user = new User()
			{
				Name = name,
				ConnectionId = connectionId
			};

			var room = _rooms.Where(r => r.RoomId == id).FirstOrDefault();

			if (room == null)
			{
				return false;
			}

			room.Participants.Add(user);
			return true;
		}

		public static int RemoveUser(string connectionId)
		{
			foreach (var room in _rooms)
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
			var room = _rooms.Where(r => r.RoomId == id).FirstOrDefault();

			if (room == null)
				{
				return false;
			}

		    ProductBacklogItem pbi = new ProductBacklogItem()
		    {
			    Title = title,
			    Estimates = new List<Estimate>()
		    };

		    room.PBIs.Add(pbi);
		    return true;
	    }

		public static bool RemovePBI(int id, string title)
		{
			var room = _rooms.Where(r => r.RoomId == id).FirstOrDefault();

			if(room != null)
		    {
				var pbi = room.PBIs.Where(p => p.Title == title).FirstOrDefault();

				if (pbi != null)
				{
					return room.PBIs.Remove(pbi);
				}
			}
			
			return false;
		}
	}
}
