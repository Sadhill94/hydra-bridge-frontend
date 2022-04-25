import { ReactNode } from "react";
import styled from "styled-components";

import { stakenetTheme as theme } from "../../../../shell/theme/stakenetTheme";
import { devicesUp } from "../../../../media";

export const StyledBridgeRoute = styled.div<{ children?: ReactNode }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin-bottom: ${(props) => (props.children ? theme.margin.md : 0)};

  @media only screen and ${devicesUp.sm} {
    align-items: center;
  }
`;

export const StyledBridgeRouteAmount = styled.div<{ rtl?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${theme.paragraph.md};
  color: ${theme.colors.white};
  min-width: 25%;
  max-width: 25%;

  .amount {
    &__number {
      word-break: break-word;
      flex-grow: 1;
    }

    &__icon {
      margin-bottom: ${theme.margin.sm};
      transform: scale(0.8);
    }
  }

  @media only screen and ${devicesUp.sm} {
    .amount {
      &__icon {
        margin-bottom: ${theme.margin.md};
        transform: scale(1);
      }
    }
  }

  @media only screen and ${devicesUp.md} {
    flex-direction: ${(props) => (props.rtl ? "row-reverse" : "row")};
    align-items: center;

    .amount {
      &__number {
        font-size: ${theme.paragraph.lg};
        text-align: ${(props) => (props.rtl ? "right" : "left")};
        letter-spacing: 0.1rem;
      }
      &__icon {
        margin: 0 ${(props) => (props.rtl ? 0 : theme.margin.md)} 0
          ${(props) => (props.rtl ? theme.margin.md : 0)};
      }
    }
  }
`;

export const StyledBridgeArrow = styled.div`
  text-align: center;
  margin-bottom: ${theme.margin.sm};
  min-width: 10%;
  max-width: 10%;

  .arrow__icon {
    transform: scale(0.8);
  }
  @media only screen and ${devicesUp.sm} {
    margin-bottom: ${theme.margin.md};

    .arrow__icon {
      transform: scale(1);
    }
  }
  @media only screen and ${devicesUp.md} {
    margin-bottom: 0;
  }
`;

export const StyledBridgeChain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30%;
  max-width: 30%;

  .chain {
    &__name {
      font-size: ${theme.paragraph.md};
      color: ${theme.colors.white};
      margin: 0;
      display: flex;
      flex-grow: 1;
      text-align: center;
    }
    &__icon {
      margin-bottom: ${theme.margin.sm};
      text-align: center;
    }
    &__group {
      display: none;
    }
  }

  @media only screen and ${devicesUp.sm} {
    .chain {
      &__icon {
        min-width: 2.6rem;
      }
    }
  }

  @media only screen and ${devicesUp.md} {
    flex-direction: row;
    justify-content: center;
    text-align: center;
    width: 100%;
    .chain {
      &__name {
        display: none;
        width: 100%;
        font-size: ${theme.paragraph.lg};
        letter-spacing: 0.1rem;
      }
      &__icon {
        margin: 0 ${theme.margin.sm} 0 0;
        &--sm {
          display: none;
        }
      }

      &__group {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-grow: 1;
        font-size: ${theme.paragraph.lg};
        color: ${theme.colors.white};
        span {
          margin-top: 0.3rem;
        }
      }
    }
  }
`;
