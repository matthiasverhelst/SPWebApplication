using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using ScrumPokerService.Hubs;
using ScrumPokerService.Models;
using SPCore.DTO;
using SPCore.Interfaces;
using SPCore;
using SPInfrastructure.Repositories;

namespace ScrumPokerService.Controllers
{
    public class ScrumPokerController : ApiControllerWithHub<ScrumPokerHub>
    {
        ISPRepository repo = new SPRepository();

        public EstimateDTO PostEstimate(EstimateModel body)
        {
            return new EstimateDTO()
            {
                Value = body.estimate
            };
        }

        public bool GetExampleMethod()
        {
            return BusinessLogic.BusinessMethod(repo);
        }

        public int CreateRoom(string scrumMasterName)
        {
            return BusinessLogic.CreateRoom(scrumMasterName);   
        }

        public void JoinRoom(string name, int id)
        {
            BusinessLogic.JoinRoom(name, id);
        }
    }
}
