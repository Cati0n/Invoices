using OpenQA.Selenium;
using Microsoft.Edge.SeleniumTools;
using System;
using Xunit;
using OpenQA.Selenium.Support.UI;

namespace InvoicesApp.AutomatedUITests
{
    public class AutomatedUITests : IDisposable
    {
        private readonly IWebDriver _driver;
        private EdgeOptions edgeOptions;
        private WebDriverWait _wait;
        public AutomatedUITests()
        {
            edgeOptions = new EdgeOptions();
            edgeOptions.UseChromium = true;

            _driver = new EdgeDriver(edgeOptions);

        }
        public void Dispose()
        {
            _driver.Quit();
            _driver.Dispose();
        }
        [Fact]
        public void Create_WhenExecuted_ReturnsCreateView()
        {

            Random rnd = new Random();
            var nums = "0123456789";
            var chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ";
            var length = 8;
            string regNumber = String.Empty;
            string phoneNumber = String.Empty;
            string email = String.Empty;
            _driver.Url = "https://localhost:5001/";
            _driver.Manage().Window.Maximize();
            _driver.FindElement(By.ClassName("pull-left")).Click();
            System.Threading.Thread.Sleep(1000);

            for (int j = 0; j <= length; j++)
            {
                regNumber += nums[rnd.Next(nums.Length)];
            }
            for (int j = 0; j <= length; j++)
            {
                phoneNumber += nums[rnd.Next(nums.Length)];
            }
            for (int j = 0; j <= length; j++)
            {
                email += chars[rnd.Next(chars.Length)];
            }
            _driver.FindElement(By.Name("addInvoiceBtn")).Click();
            _driver.FindElement(By.Id("invoicenumber")).SendKeys("1");
            _driver.FindElement(By.Id("regnumber")).SendKeys(regNumber);
            _driver.FindElement(By.Id("companyname")).SendKeys("Company Incorporation Full Long");
            _driver.FindElement(By.Id("firstname")).SendKeys("Albert");
            _driver.FindElement(By.Id("lastname")).SendKeys("GooodMan");
            _driver.FindElement(By.Id("address")).SendKeys("Ehitajate tee " + rnd.Next(60).ToString());
            System.Threading.Thread.Sleep(1000);
            _driver.FindElement(By.ClassName("autocomplete-items")).Click();
            _driver.FindElement(By.Id("email")).SendKeys(email + "@gmail.com");
            _driver.FindElement(By.Id("phone")).SendKeys(phoneNumber);
            _driver.FindElement(By.Id("issuedate")).SendKeys(rnd.Next(30) + DateTime.Now.AddMonths(rnd.Next(12)).ToString("MMM") + Keys.ArrowRight + "2021");
            _driver.FindElement(By.Id("duedate")).SendKeys(rnd.Next(30) + DateTime.Now.AddMonths(rnd.Next(12)).ToString("MMM") + Keys.ArrowRight + "2021");
            System.Threading.Thread.Sleep(1000);
            _driver.FindElement(By.ClassName("btn-primary")).Click();
            System.Threading.Thread.Sleep(1000);
            var count = 0;
            while (_driver.FindElement(By.Id("addAssignmentRowBtn")).GetAttribute("disabled") != "true")
            {

                _driver.FindElement(By.Id("assignment" + count)).SendKeys("TestAssignment" + count);
                _driver.FindElement(By.Id("unit" + count)).SendKeys("tk");
                _driver.FindElement(By.Id("QuantityInput" + count)).SendKeys(rnd.Next(1000).ToString());
                _driver.FindElement(By.Id("PriceInput" + count)).SendKeys(rnd.Next(1000).ToString());
                _driver.FindElement(By.Id("addAssignmentRowBtn")).Click();
                count++;
                System.Threading.Thread.Sleep(1000);
            }
            _driver.FindElement(By.Id("FinishInvoiceBtn")).Click();
        }
    }
}
