import type UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import { KeycloakSpinner, useFetch } from "@keycloak/keycloak-ui-shared";
import {
  Button,
  Card,
  CardBody,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  PageSection,
} from "@patternfly/react-core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useAdminClient } from "../admin-client";
import { ViewHeader } from "../components/view-header/ViewHeader";
import { useRealm } from "../context/realm-context/RealmContext";
import useFormatDate from "../utils/useFormatDate";
import { toTestTask } from "./routes/TestTask";

const EMPTY_VALUE = "-";

const getFieldValue = (value?: string) => value || EMPTY_VALUE;

export default function UserDetails() {
  const { adminClient } = useAdminClient();
  const { t } = useTranslation();
  const { realm } = useRealm();
  const { id } = useParams();
  const formatDate = useFormatDate();
  const [user, setUser] = useState<UserRepresentation>();

  useFetch(
    async () => {
      if (!id) {
        throw new Error(t("notFound"));
      }

      return adminClient.users.findOne({ id });
    },
    (user) => {
      if (!user) {
        throw new Error(t("notFound"));
      }

      setUser(user);
    },
    [id],
  );

  if (!user) {
    return <KeycloakSpinner />;
  }

  const createdAt = user.createdTimestamp
    ? formatDate(new Date(user.createdTimestamp))
    : EMPTY_VALUE;

  return (
    <>
      <ViewHeader titleKey="userDetails" divider={false} />
      <PageSection variant="light">
        <Button
          component={(props) => (
            <Link {...props} to={toTestTask({ realm, tab: "users" })} />
          )}
          variant="link"
          isInline
        >
          {t("back")}
        </Button>
        <Card className="pf-v5-u-mt-md" data-testid="test-task-user-details">
          <CardBody>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>{t("username")}</DescriptionListTerm>
                <DescriptionListDescription>
                  {getFieldValue(user.username)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t("email")}</DescriptionListTerm>
                <DescriptionListDescription>
                  {getFieldValue(user.email)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t("firstName")}</DescriptionListTerm>
                <DescriptionListDescription>
                  {getFieldValue(user.firstName)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t("lastName")}</DescriptionListTerm>
                <DescriptionListDescription>
                  {getFieldValue(user.lastName)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t("enabled")}</DescriptionListTerm>
                <DescriptionListDescription>
                  {user.enabled ? t("enabled") : t("disabled")}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t("emailVerified")}</DescriptionListTerm>
                <DescriptionListDescription>
                  {user.emailVerified ? t("yes") : t("no")}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{t("createdAt")}</DescriptionListTerm>
                <DescriptionListDescription>
                  {createdAt}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
}
