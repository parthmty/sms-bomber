import { createClient } from '@supabase/supabase-js';

export class PhoneLogController {
    // Use Supabase REST API to check if the phone number is already in the database

    #URL = "https://iezdktssyqrwktnhapqw.supabase.co";
    #API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllemRrdHNzeXFyd2t0bmhhcHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MzE5MjYsImV4cCI6MjAyNTIwNzkyNn0.qm56TYh6q7jmsY6vJLUwFrmilH_RIJe_VCCyLwtJ71k";

    constructor() {
        this.supabase = createClient(this.#URL, this.#API_KEY);
    }

    async isPhoneNumberAllowed(phoneNumber) {
        return 1;
        // Check if the phone number is already in the database
        let { data, error } = await this.supabase
            .from('bombLog')
            .select('last_bombed')
            .eq('phone', phoneNumber);

        if (error) {
            console.error(error);
            return -1;
        }

        if (data.length > 0) {
            console.log(data);
            // Get the value of column named last_bombed with latest number in string format
            let lastBombed = parseInt(data[0].last_bombed);
            for (let i = 0; i < data.length; i++) {
                let currentBombed = parseInt(data[i].last_bombed)
                if (currentBombed > lastBombed) {
                    lastBombed = currentBombed;
                }
            }

            const currentTime = Date.now();
            const timeDifference = currentTime - lastBombed; // in milliseconds
            const timeDifferenceInMinutes = timeDifference / (1000 * 60);

            // Allow the phone number to be bombed if the last bombing was done more than 120 minutes ago
            if (timeDifferenceInMinutes > 120) {
                return 1;
            } else {
                return 0;
            }

        } else {
            return 1;
        }
    }

    async logPhoneNumber(phoneNumber) {
        return 1;
        // Log the phone number in the database
        let { data, error } = await this.supabase
            .from('bombLog')
            .insert([
                { phone: phoneNumber, last_bombed: Date.now() }
            ]);

        if (error) {
            console.error(error);
            return -1;
        }

        return 1;
    }
}