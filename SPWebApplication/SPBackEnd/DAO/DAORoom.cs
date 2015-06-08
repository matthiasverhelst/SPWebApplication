using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPBackEnd.Context;
using SPBackEnd.DTO;

namespace SPBackEnd.DAO
{
    public class DAORoom : DAOBase<MainDbContext>
    {

        public bool CreateRoom(RoomDTO @room)
        {
            db.Rooms.Add(@room);
            int result = db.SaveChanges();
            return (result > 0);
        }



    }
       
}