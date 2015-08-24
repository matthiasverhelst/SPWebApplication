using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Mvc;

namespace SPBackEnd
{
    
    public class TestService : ITestService
    {
        public String DoWork(String body)
        {
            // Add your operation implementation here
            //int intEstimate = Convert.ToInt32(estimate);
            JsonResult jsonResult = new JsonResult();
            jsonResult.Data = "{'estimate' : 42}";
            return jsonResult.Data.ToString();
        }

        // Add more operations here and mark them with [OperationContract]
    }
}
