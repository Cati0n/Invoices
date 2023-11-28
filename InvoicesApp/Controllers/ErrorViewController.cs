using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InvoicesApp.Controllers
{
    [Route("~/error/statuscode")]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public class ErrorViewController : Controller
    {
        private readonly ILogger<ErrorViewController> _logger;

        public ErrorViewController(ILogger<ErrorViewController> logger)
        {
            _logger = logger;
        }

        [Route("403")]
        public IActionResult Error403()
        {
            //   return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
            return View();
        }

        [Route("404")]
        public IActionResult Error404()
        {
            return View();
        }

        [Route("500")]
        public IActionResult Error500()
        {
            return View();
        }
    }
}
