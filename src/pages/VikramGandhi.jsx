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
        "Asha Ventures (www.ashaventures.in) leverages capital, networks and expertise to address critical development challenges through impact investing, venture philanthropy and policy advocacy.",
        "Currently based in India, Asha Ventures provides equity and grant capital to social enterprises while also engaging with government, business and civil society.",
        "Prior to his current activities, Vikram was Vice Chairman of Investment Banking and Global Head of the Financial Institutions Business for Credit Suisse, in New York and Hong Kong.",
        "At Credit Suisse, he was a member of the Global Investment Banking Management Committee and the Fixed Income Operating Committee. Prior to that, Vikram worked at Morgan Stanley where he was Co-Head of Global FIG in New York and earlier, Country Head and President of Morgan Stanley India.",
        "Over his 23-year career in investment banking, Vikram advised Boards and CEOs globally on strategic direction, mergers, acquisitions, and capital raising initiatives.",
      ]}
      rightDetails={[
        "Beyond finance, Vikram has been actively involved in developmental activities. He is a Board Member and Chairman of the Asian Regional Committee of Grameen Foundation, a Board Member of Jana Small Finance Bank, and part of the Investment Committee at Gawa Capital.",
        "Vikram is a Founding Member of Harvard University's South Asia Initiative and a Founder of Ashoka University, India’s first liberal arts college.",
        "He holds an MBA from Harvard Business School (Baker Scholar), a B.Com from the University of Mumbai with high distinction, and is a qualified Chartered Accountant.",
      ]}
    />
  );
}
