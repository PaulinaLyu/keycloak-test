import type UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import {
  KeycloakDataTable,
  ListEmptyState,
  useAlerts,
} from "@keycloak/keycloak-ui-shared";
import { PageSection } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAdminClient } from "../admin-client";
import { useRealm } from "../context/realm-context/RealmContext";
import { emptyFormatter } from "../util";
import { toTestTaskUser } from "./routes/TestTask";

const DEFAULT_FIRST_USER = 0;
const DEFAULT_MAX_USERS = 10;
const EMPTY_VALUE = "-";

const EnabledCell = (user: UserRepresentation) => {
  const { t } = useTranslation();

  return user.enabled ? t("enabled") : t("disabled");
};

const UsernameCell = (user: UserRepresentation) => {
  const { realm } = useRealm();

  if (!user.id) {
    return user.username || EMPTY_VALUE;
  }

  return (
    <Link to={toTestTaskUser({ realm, id: user.id })}>{user.username}</Link>
  );
};

export function UsersTab() {
  const { adminClient } = useAdminClient();
  const { addError } = useAlerts();
  const { t } = useTranslation();
  const { realm } = useRealm();

  const loader = async (first?: number, max?: number, search?: string) => {
    try {
      return await adminClient.users.find({
        first: first ?? DEFAULT_FIRST_USER,
        max: max ?? DEFAULT_MAX_USERS,
        search: search || undefined,
        briefRepresentation: true,
      });
    } catch (error) {
      addError("noUsersFoundError", error);
      return [];
    }
  };

  return (
    <PageSection variant="light" padding={{ default: "noPadding" }}>
      <KeycloakDataTable
        key={realm}
        loader={loader}
        isPaginated
        ariaLabelKey="titleUsers"
        searchPlaceholderKey="searchForUser"
        emptyState={
          <ListEmptyState
            message={t("noUsersFound")}
            instructions={t("emptyInstructions")}
          />
        }
        columns={[
          {
            name: "username",
            displayKey: "username",
            cellRenderer: UsernameCell,
          },
          {
            name: "email",
            displayKey: "email",
            cellFormatters: [emptyFormatter()],
          },
          {
            name: "firstName",
            displayKey: "firstName",
            cellFormatters: [emptyFormatter()],
          },
          {
            name: "lastName",
            displayKey: "lastName",
            cellFormatters: [emptyFormatter()],
          },
          {
            name: "enabled",
            displayKey: "enabled",
            cellRenderer: EnabledCell,
          },
        ]}
      />
    </PageSection>
  );
}
