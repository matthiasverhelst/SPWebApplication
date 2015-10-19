using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Mvc;
using SPCore.DTO;
using SPBackEnd.Models;
using SPCore.Interfaces;
using SPCore;
using SPInfrastructure.Repositories;

namespace SPBackEnd
{
    public class TestService : ITestService
    {
        ISPRepository repo = new SPRepository();

        public EstimateDTO DoWork(EstimateModel body)
        {
            return new EstimateDTO() { 
                Value = body.estimate
            };
        }

        public bool ExampleMethod()
        {
            return BusinessLogic.BusinessMethod(repo);
        }
    }
}
