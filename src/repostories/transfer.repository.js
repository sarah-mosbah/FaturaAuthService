import { TransfersEntity } from "../models/transfer.model.js"
import mongoose from "mongoose";
import { UserPointsEntity } from "../models/userPoint.model.js";
import {confirmed} from '../utils/transferStatus.utils.js'
export async function getTransferById(transferId) {
    try {
        return await TransfersEntity.findById(transferId);
     } catch (error) {
         // Some Logs
         throw error;
     }
}

export async function initTransfer(transfer) {
    try {
       return await TransfersEntity.create(transfer);
    } catch (error) {
        throw error;
    }
}

export async function updateTransfere(transferId, tranactionStatus) {
    try {
       return await TransfersEntity.findByIdAndUpdate(transferId, {$set: {tranactionStatus}});
    } catch (error) {
        throw error;
    }
}

export async function deleteTransfere(transferId) {
    try {
       return await TransfersEntity.findByIdAndRemove(transferId);
    } catch (error) {
        throw error;
    }
}

export async function confirmTransaction(receiverId, transfererId, transferedPoints, transferId) {
        let session;
        try {
            session = await mongoose.startSession();
            session.startTransaction();
            await UserPointsEntity.findOneAndUpdate({userId: transfererId},  {$inc: {points: -transferedPoints}});
            await UserPointsEntity.findOneAndUpdate({userId: receiverId}, {$inc: {points: -transferedPoints}});
            const transfer = await TransfersEntity.findByIdAndUpdate(transferId, {$set: {transactionStatus: confirmed}})
            await session.commitTransaction();
            await  session.endSession();
            return transfer;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
}


export async function getUserTransferes(userId) {
    try {
      return await TransfersEntity.find({transfererId: userId}).lean();
    } catch (error) {
        throw error;
    }
}