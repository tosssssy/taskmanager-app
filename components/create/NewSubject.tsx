import React from "react";
import Router from "next/router";
import { NewSubjectProps } from "../../pages/create";
import styled from "styled-components";

type Props = {
  subject: NewSubjectProps;
  deleteSubject: Function;
};

const NewSubject: React.FC<Props> = (props) => {
  const { subject, period, day } = props.subject.newSubject;
  return (
    <>
      <Scontainer>
        <Sitem>{day}</Sitem>
        <Sitem>{period}</Sitem>
        <Sitem>{subject}</Sitem>
        <Sbutton onClick={() => props.deleteSubject}>×</Sbutton>
      </Scontainer>
    </>
  );
};

export default NewSubject;

const Scontainer = styled.div`
  display: flex;
  background-color: #cbe4ff;
  width: 300px;
  margin: 10px;
  border-radius: 3px;
`;

const Sitem = styled.div`
  font-size: 18px;
  padding: 10px 0;
  margin-left: 20px;
`;
const Sbutton = styled(Sitem)`
  font-size: 150%;
  display: inline;
  color: white;
  padding: 0;
  margin: auto 10px 10px auto;

  &:hover {
    cursor: pointer;
    color: orange;
  }
`;
