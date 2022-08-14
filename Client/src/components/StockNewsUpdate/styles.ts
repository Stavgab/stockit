import styled from "styled-components";
import Palette from "../../utils/Palette";

export const CreateContainer = styled.div`
  justify-content:space-between;
  margin-top:40px;
  flex-direction:column;
  display: flex;
  align-content:left;
  align-items:left;
  height:400px;
  margin-left:40px;
`;

export const TitleInput = styled.div`
  width:400px;
  padding: 5px 15px;
  border-radius: 10px;
  border: 1.5px solid ${Palette.BACKGROUND_GERY};
  :focus,
  :focus-visible,
  :focus-within {
    border: 0.5px solid ${Palette.PRIMARY_GERY};
  }
`;

export const DescriptionInput = styled.div`
  height:200px;
  width:50%;
  padding: 5px 15px;
  border-radius: 10px;
  border: 1.5px solid ${Palette.BACKGROUND_GERY};
  :focus,
  :focus-visible,
  :focus-within {
    border: 0.5px solid ${Palette.PRIMARY_GERY};
  }
`;

export const AuthorInput = styled.div`
  width:200px;
  padding: 5px 15px;
  border-radius: 10px;
  border: 1.5px solid ${Palette.BACKGROUND_GERY};
  :focus,
  :focus-visible,
  :focus-within {
    border: 0.5px solid ${Palette.PRIMARY_GERY};
  }
`;

export const DateInput = styled.div`
  width:200px;
  padding: 5px 15px;
  border-radius: 10px;
  border: 1.5px solid ${Palette.BACKGROUND_GERY};
  :focus,
  :focus-visible,
  :focus-within {
    border: 0.5px solid ${Palette.PRIMARY_GERY};
  }
`;

export const SourceInput = styled.div`
  width:200px;
  padding: 5px 15px;
  border-radius: 10px;
  border: 1.5px solid ${Palette.BACKGROUND_GERY};
  :focus,
  :focus-visible,
  :focus-within {
    border: 0.5px solid ${Palette.PRIMARY_GERY};
  }
`;

export const Input = styled.input`
  background: none;
  border: none;
  width: 50vw;
  height: 2rem;

  :focus {
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
    margin-top:20px;
    margin-left:40px;
`;