"use strict"

const AWS = require("aws-sdk");

const updateItem = async (event) => {

    const {itemStatus} = JSON.parse(event.body);
    const {id} = event.pathParam;

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    await dynamoDB.update({
        tableName: "ItemTableNew",
        key: {id},
        UpdateExpression: 'set itemStatus = :itemStatus',
        ExpressionAttributeNames:{
            ':itemStatus': itemStatus,
        },
        ReturnValues: "ALL_NEW"
    }).promise();


    return {
        satusCode: 200,
        body: JSON.stringify({msg: 'Item updated'})
    }

}

module.exports = {
    handler: updateItem
}