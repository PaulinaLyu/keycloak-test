import { PageSection, Tab, TabTitleText } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { ViewHeader } from "../components/view-header/ViewHeader";
import {
  RoutableTabs,
  useRoutableTab,
} from "../components/routable-tabs/RoutableTabs";
import { useRealm } from "../context/realm-context/RealmContext";
import { RealmInfoTab } from "./RealmInfoTab";
import { TestTaskTab, toTestTask } from "./routes/TestTask";
import { UsersTab } from "./UsersTab";

export default function TestTaskSection() {
  const { t } = useTranslation();
  const { realm } = useRealm();

  const useTab = (tab: TestTaskTab) =>
    useRoutableTab(
      toTestTask({
        realm,
        tab,
      }),
    );

  const realmTab = useTab("realm");
  const usersTab = useTab("users");

  return (
    <>
      <ViewHeader titleKey="test" divider={false} />
      <PageSection
        data-testid="test-task-page"
        variant="light"
        className="pf-v5-u-p-0"
      >
        <RoutableTabs
          data-testid="test-task-tabs"
          defaultLocation={toTestTask({ realm, tab: "realm" })}
          isBox
          mountOnEnter
        >
          <Tab
            id="realm"
            data-testid="realmTab"
            title={<TabTitleText>{t("realm")}</TabTitleText>}
            {...realmTab}
          >
            <RealmInfoTab />
          </Tab>
          <Tab
            id="users"
            data-testid="usersTab"
            title={<TabTitleText>{t("users")}</TabTitleText>}
            {...usersTab}
          >
            <UsersTab />
          </Tab>
        </RoutableTabs>
      </PageSection>
    </>
  );
}
