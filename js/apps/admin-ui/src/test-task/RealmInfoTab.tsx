import { useAlerts } from "@keycloak/keycloak-ui-shared";
import {
  AlertVariant,
  Button,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  PageSection,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { useRealm } from "../context/realm-context/RealmContext";

export function RealmInfoTab() {
  const { t } = useTranslation();
  const { addAlert, addError } = useAlerts();
  const { realm } = useRealm();

  const copyRealmName = async () => {
    try {
      await navigator.clipboard.writeText(realm);
      addAlert(t("testTaskRealmCopied"), AlertVariant.success);
    } catch (error) {
      addError("testTaskClipboardCopyError", error);
    }
  };

  return (
    <PageSection variant="light">
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>{t("testTaskCurrentRealm")}</DescriptionListTerm>
          <DescriptionListDescription>{realm}</DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
      <Button
        className="pf-v5-u-mt-md"
        data-testid="copy-realm-name"
        onClick={() => void copyRealmName()}
      >
        {t("testTaskCopyRealm")}
      </Button>
    </PageSection>
  );
}
