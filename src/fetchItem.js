"use strict"
const AWS = require("aws-sdk");

const fetchItem = async (event) => {

    const { id } = event.pathParameters;
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    let item;

    try {
        const result = await dynamoDB.get({
            TableName: "ItemTableNew",
            Key: { id }
        }).promise();

        item = result.Item;

    } catch (erro) {
        console.log(erro);
    }


    return {
        statusCode: 200,
        body: JSON.stringify(item)
    }
}

module.exports = {
    handler: fetchItem
}