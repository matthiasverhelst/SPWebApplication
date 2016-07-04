using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using SPCore;
using SPCore.Model;

using ScrumPokerService.DTO;

namespace ScrumPokerService.Converters
{
    public class ConvertersDTO
    {
        public static ICollection<UserEstimateDTO> ConvertToUserEstimates(ICollection<User> users, ICollection<Estimate> estimates) 
        {
            ICollection<UserEstimateDTO> userEstimates = new List<UserEstimateDTO>();

            foreach (User u in users) 
            {
                Estimate est = estimates.Where(e => e.Participant == u).FirstOrDefault();
                string estVal;
                if (est != null)
                {
                    estVal = est.Value;
                }
                else
                {
                    estVal = "";
                }
                UserEstimateDTO userEstimate = new UserEstimateDTO()
                {
                    UserName = u.Name,
                    Estimate = estVal
                };

                userEstimates.Add(userEstimate);
            }

            return userEstimates;
        }
    }
}