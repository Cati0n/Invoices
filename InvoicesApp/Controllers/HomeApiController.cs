using System;
using System.Collections.Generic;
using InvoicesApp.Interfaces;
using InvoicesApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace InvoicesApp.Controllers
{
    [Route("~/api/")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        private readonly IAssignmentService _assignmentService;

        [Route("status/alive")]
        [HttpGet]
        public IActionResult Alive()
        {
            return StatusCode(200);
        }

        public InvoicesController(IInvoiceService invoiceService, IAssignmentService assignmentService)
        {
            _invoiceService = invoiceService;
            _assignmentService = assignmentService;
        }

        [Route("create/contactdata")]
        [HttpPost]
        public IActionResult CreateInvoice([FromBody] AddInvoiceIncomeModel model)
        {
            var id = _invoiceService.AddInvoice(model);
            var redirectResult = new RedirectToActionResult("CreateAssignments", "HomeView", new { @Id = id.Guid });
            return redirectResult;
        }

        [Route("create/assignments/{id}")]
        [HttpPost]
        public IActionResult CreateAssignments([FromBody] List<AddAssignmentIncomeModel> model, [FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                throw new ApplicationException("Wrong model values provided");
            }
            _assignmentService.AddAssignment(model, id);
            return Ok();
        }

        [Route("invoice/{invoiceId}")]
        [HttpGet]
        public IActionResult Invoice([FromRoute] Guid invoiceId)
        {
            var invoice = _invoiceService.GetInvoice(invoiceId);

            return Ok(invoice);
        }

        [Route("getinvoices")]
        [HttpGet]
        public IActionResult List()
        {
            var invoice = _invoiceService.GetInvoices();

            return Ok(invoice);
        }
    }
}
