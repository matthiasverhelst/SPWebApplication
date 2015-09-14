using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Mvc;
using SPBackEnd.DTO;

namespace SPBackEnd
{
    
    public class TestService : ITestService
    {
        public EstimateDTO DoWork(String body)
        {
            EstimateDTO estimate = new EstimateDTO();
            estimate.Value = 42;

            return estimate;
        }
    }
}
