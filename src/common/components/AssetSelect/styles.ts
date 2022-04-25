import styled from "styled-components";

import { FlexWrapper } from "../Atoms/Wrappers/Wrapper";
import { devicesUp } from "../../../media";
import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";

export const StyledAssetSelectResponsiveFlexWrapper = styled(FlexWrapper)`
  flex-direction: column;
  align-items: start;

  @media only screen and ${devicesUp.lg} {
    flex-direction: row;
    justify-content: end;
    align-items: center;

    .label {
      margin: 0 ${theme.margin.md} 0 0;
    }
    /* brand-select */
    & > div {
      max-width: ${theme.maxWidth.md};
    }
  }
`;
