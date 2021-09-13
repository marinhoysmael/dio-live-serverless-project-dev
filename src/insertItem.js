"use strict"

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const insertItem = async (event) => {

    const { item } = JSON.parse(event.body);
    const createAt = new Date().toISOString();
    const id = v4();

    //chamar o dynamoDB
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const newItem = {
        id,
        item,
        createAt,
        itemStatus: false
    }

    //por padrão o dynamoDB usa essas duas chaves de objeto: 
    //TableName: referente ao nome da tabela especificado no yml
    //Item: referente ao objeto que deseja salvar
    await dynamoDB.put({
        TableName: "ItemTableNew",
        Item: newItem
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    };
}

module.exports = {
    handler: insertItem
}