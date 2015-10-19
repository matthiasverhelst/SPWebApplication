using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SPCore.Interfaces;

namespace SPCore
{
    public class BusinessLogic
    {
        public static bool BusinessMethod(ISPRepository repo)
        {
            //Do whichever business logic you need, combined with the necessary database calls via the repo variable.
            return true;
        }
    }
}
