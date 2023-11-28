using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InvoicesApp.Controllers
{
    [Route("~/")]
    public class HomeViewController : Controller
    {
        private readonly ILogger<HomeViewController> _logger;

        public HomeViewController(ILogger<HomeViewController> logger)
        {
            _logger = logger;
        }


        public IActionResult List()
        {
            return View();
        }

        [Route("create/contactdata")]
        public IActionResult CreateContact()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [Route("create/assignment")]
        public IActionResult CreateAssignments()
        {
            return View();
        }

        [Route("settings")]
        public IActionResult InvoicesSettings()
        {
            return View();
        }

        [Route("invoice/details")]
        public IActionResult Details()
        {
            return View();
        }
    }
}
