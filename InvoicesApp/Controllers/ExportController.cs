using Microsoft.AspNetCore.Mvc;
using SelectPdf;
using System;
using System.IO;
using System.Net;
using System.Net.Http;

namespace InvoicesApp.Controllers
{
    [Route("~/api/export/")]
    public class ExportController : Controller
    {
        [Route("pdfexport")]
        [HttpPost]
        public IActionResult PdfExport([FromBody] string htmlSnippet)
        {
            MemoryStream ms = new MemoryStream();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();
            // set converter options
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Landscape;
            converter.Options.MarginLeft = 40;

            // create a new pdf document converting an html string
            
            PdfDocument doc = converter.ConvertHtmlString(htmlSnippet, "https://localhost:5001/");

            // save pdf document
            doc.Save(ms);
            doc.Close();

            ms.Position = 0;
            var fileStreamResult = new FileStreamResult(ms, "application/pdf");
            fileStreamResult.FileDownloadName = "Invoice.pdf";

            return fileStreamResult;

        }
    }
}