import PersonProfile from "../components/PersonProfile";

export default function VikramGandhi() {
  return (
    <PersonProfile
      name="Vikram Gandhi"
      role="Founder"
      linkedin="https://www.linkedin.com/in/vikramgandhi"
      email="vikram@example.com"
      image="/assets/people/Vikram_5-removebg-preview.png"
      intro="Founder of Asha Ventures, an impact investing platform."
      leftDetails={[
        "He is a member of the Faculty of the Harvard Business School where he teaches in both the MBA & Executive Education programs. He is also a Senior Advisor to The Canada Pension Plan Investment Board (www.cppib.com).",
        "He is also the Founder of Asha Ventures (https://www.ashaventures.in/), an impact investing platform that mobilizes capital, expertise, and partnerships to address key development challenges in India and other emerging economies through impact investing, venture philanthropy, and policy advocacy.",
        "In addition, Vikram serves as a Senior Advisor to the Canada Pension Plan Investment Board (CPPIB) (https://www.cppib.com/), advising on energy transition and India-focused investments.",
        "Currently based in India, Asha Ventures provides equity and grant capital to social enterprises while also engaging with government, business and civil society.",
        "Previously, he spent over two decades in global investment banking as Vice Chairman of Investment Banking and Global Head of the Financial Institutions Group at Credit Suisse, and Co - Head of Global FIG at Morgan Stanley.",
        "At Credit Suisse, he was a member of the Global Investment Banking Management Committee and the Fixed Income Operating Committee. Prior to that, Vikram worked at Morgan Stanley where he was Co-Head of Global FIG in New York and earlier, Country Head and President of Morgan Stanley India.",
      ]}
      rightDetails={[
        "Over his 23-year career in investment banking, Vikram advised Boards and CEOs globally on strategic direction, mergers, acquisitions, and capital raising initiatives.",
        "Beyond finance, Vikram has been actively involved in developmental activities. He is a Board Member and Chairman of the Asian Regional Committee of Grameen Foundation, a Board Member of Jana Small Finance Bank, and part of the Investment Committee at Gawa Capital.",
        "Vikram also serves on several boards and advisory bodies, including KEC International Ltd, Grameen Foundation, and Gawa Capital. He is a Founding Member of Harvard University's South Asia Initiative, a Founder of Ashoka University, and a member of the Bretton Woods Committee.",
        "He holds an MBA from Harvard Business School, where he was a Baker Scholar, and a B.Com with high distinction from the University of Mumbai. He is also a qualified Chartered Accountant.",
      ]}
    />
  );
}
