import { ReactElement } from "react";
import IMDAnimatedTextBounce from "../atoms/typography/IMDAnimatedTextBounce";

const IMDAboutMe = ({
  className = "",
  children,
}: {
  className?: string;
  children?: Array<ReactElement> | ReactElement | string;
}) => {
  return (
    <div className={`py-24 flex flex-col ${className}`}>
      <IMDAnimatedTextBounce
        className="text-6xl xs:text-4xl"
        letterClass="underline"
        text="About:"
      />
      <p className="mt-12 text-2xl xs:text-xl">
        {`Full-stack software developer, with ${
          new Date().getFullYear() - new Date(2019, 8, 1).getFullYear()
        } years of experience. Participated in different projects of
          great importance for companies, many of them involving learning about areas that I wasn't
          specialized in, such as developing web and mobile applications for a recruiting and an electrical
          support company, applying my skills to bring the company's vision to life. I have good
          collaboration, productive, creative and assertive skills that will be one of the main points of
          interest for the company wanting to hire me.`}
      </p>
    </div>
  );
};

export default IMDAboutMe;
