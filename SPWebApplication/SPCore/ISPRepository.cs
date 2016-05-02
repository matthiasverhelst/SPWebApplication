using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPCore.Model;

namespace SPCore.Interfaces
{
    public interface ISPRepository
    {
        bool StoreFinalEstimate(Estimate estimate);
        bool CreateRoom(Room room);
        bool CreateUser(User user);
    }
}
