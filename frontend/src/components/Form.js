import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getClients, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const client = ref.current;

      client.name.value = onEdit.name;
      client.email.value = onEdit.email;
      client.phone.value = onEdit.phone;
      client.x.value = onEdit.x;
      client.y.value = onEdit.y;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const client = ref.current;

    if (
      !client.name.value ||
      !client.email.value ||
      !client.phone.value ||
      !client.x.value ||
      !client.y.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          name: client.name.value,
          email: client.email.value,
          phone: client.phone.value,
          x: client.x.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          name: client.name.value,
          email: client.email.value,
          phone: client.phone.value,
          x: client.x.value,
          y: client.y.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    client.name.value = "";
    client.email.value = "";
    client.phone.value = "";
    client.x.value = "";
    client.y.value = "";

    setOnEdit(null);
    getClients();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>name</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telephone</Label>
        <Input name="phone" />
      </InputArea>
      <InputArea>
        <Label>X</Label>
        <Input name="x" />
      </InputArea>
      <InputArea>
        <Label>Y</Label>
        <Input name="y" />
      </InputArea>

      <Button type="submit">Save</Button>
    </FormContainer>
  );
};

export default Form;