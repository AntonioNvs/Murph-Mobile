import styled from 'styled-components/native';
import colors from './colors.json';

interface IFont {
  font: string;
}

interface IText extends IFont{
  color: string;
  direction: string;
}

export const TextContainer = styled.ScrollView`
  width: 100%;
  padding: 16px;
`;

export const Text = styled.Text<IText>`
  font-family: ${(props: IText) => props.font};
  font-size: 14px;
  color: ${(props: IText) => props.color};

  align-self: ${(props: IText) => props.direction};
  text-align: ${(props:IText) => (props.direction === 'flex-start' ? 'right' : 'left')}
  margin-bottom: 4px;
`;

export const InputCommand = styled.TextInput<IFont>`
  width: 100%;
  height: 64px;
  padding: 16px;

  background-color: ${colors.gray};

  font-family: ${(props: IFont) => props.font};
  font-size: 12px;
  color: ${colors.white};
`;
