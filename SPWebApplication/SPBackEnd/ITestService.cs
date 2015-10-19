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

namespace SPBackEnd
{
    [ServiceContract]
    public interface ITestService
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        [WebInvoke(Method="POST", RequestFormat=WebMessageFormat.Json, ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Bare, UriTemplate="AddEstimate")]
        EstimateDTO DoWork(EstimateModel body);

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "Example")]
        bool ExampleMethod();
    }
}
