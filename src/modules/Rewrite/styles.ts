import styled from "styled-components";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { devicesUp } from "../../media";
import { FlexWrapper } from "../../common/components/Atoms/Wrappers/Wrapper";

export const StyledHydraBackground = styled.section`
  min-height: 100vh;
  min-width: 100vw;
  background: url("./hydra-background.svg") no-repeat fixed center center;
  background-size: cover;
  padding: ${theme.margin.lg} 0;

  @media only screen and ${devicesUp.md} {
    padding: 4rem 0 4rem 0;
  }
`;

export const StyledHomeCustomFlexWrapper = styled(FlexWrapper)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4.3rem;
  padding-left: 2rem;
  padding-right: 2rem;

  @media only screen and ${devicesUp.sm} {
    justify-content: flex-end;
    margin-bottom: ${theme.margin.xxl};

    .hydra-bridge-logo-sm {
      display: none;
    }
  }
  @media only screen and ${devicesUp.lg} {
    position: absolute;
    left: 0;
  }

  @media only screen and ${devicesUp.lg} {
    padding-right: 4rem;
  }
`;

export const StyledHomeResponsiveFlexWrapper = styled(FlexWrapper)`
  .hydra-bridge-logo {
    display: none;
  }
  .asset-select {
    width: 100%;
  }

  @media only screen and ${devicesUp.sm} {
    .hydra-bridge-logo {
      display: block;
      transform: scale(1.2);
      margin-bottom: ${theme.margin.xl};
    }
  }

  @media only screen and ${devicesUp.lg} {
    flex-direction: row;
    justify-content: space-between;

    .hydra-bridge-logo {
      transform: scale(1);
      margin-bottom: 0;
    }
  }
`;
