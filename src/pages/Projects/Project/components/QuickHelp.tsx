import TabPanel from "../../../../components/TabPanel/TabPanel.tsx";
import BlockWrap from "../../../../components/BlockWrap/BlockWrap.tsx";

const QuickHelp = () => {
  return (
    <BlockWrap additionalClassNames={"mt-[65px]"}>
      <h3 className="text-2xl font-semibold leading-none tracking-tight mb-6">Quick Help</h3>
      <TabPanel
        tabs={[
          {
            title: "Setup",
            content: (
              <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
                <h4 className="font-medium">Getting Started</h4>
                <ol className="list-decimal pl-4 space-y-2 text-sm">
                  <li>Copy the installation script</li>
                  <li>Paste it into your website's header</li>
                  <li>Authorize your website</li>
                  <li>Start creating tooltips</li>
                </ol>
              </div>
            ),
          },
          {
            title: "Usage",
            content: (
              <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
                <h4 className="font-medium">Creating Tooltips</h4>
                <p className="text-sm">
                  After authorization, you can select elements on your website and add tooltips to
                  them. Customize appearance, timing, and behavior from the dashboard.
                </p>
              </div>
            ),
          },
          {
            title: "FAQ",
            content: (
              <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4 mt-4">
                <h4 className="font-medium">Common Questions</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Q: Is it secure?</strong>
                  </p>
                  <p>A: Yes, all authorization data is stored locally in your browser.</p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </BlockWrap>
  );
};

export default QuickHelp;
