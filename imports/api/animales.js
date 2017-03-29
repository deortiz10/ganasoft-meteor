/**s
 * Created by Juan on 16/03/2017.
 */

import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Animales = new Mongo.Collection('animales');

if (Meteor.isServer) {
    Meteor.publish('animales', function animalsPublication() {
        return Animales.find({
            $or: [
                {owner: this.userId},
            ],
        });
    });
}

Meteor.methods({
    'animales.insert'(farm, number, especie, raza, sexo, descripcion) {

        console.log("ATRIBUTOS");
        console.log(farm);
        console.log(number);
        console.log(especie);
        console.log(raza);
        console.log(sexo);
        console.log(descripcion);

        check(number, Number);
        check(especie, String);
        check(raza, String);
        check(sexo, String);
        check(descripcion, String);

         // Borren referencias al ttorial de meteor, es decir los comentarios que este da al igual que usena variables propias para 
        //evitar confuciones
        //bien la organizacion

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Animales.insert({
            farm,
            number,
            especie,
            raza,
            sexo,
            descripcion,
            fechaNacimiento: new Date(),
            owner: this.userId
        });
    },

    'animales.remove'(animalId) {
        console.log(animalId);
        //check(taskId, String);


        const task = Animales.findOne(animalId);
        if (task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Animales.remove(animalId);
    },
});
