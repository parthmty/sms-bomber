export class BomberController {
    static async startBombing(phone, count, delay) {
        try {
            let bombingResponse = await fetch('https://api.github.com/repos/guruwovi/Bombit/dispatches', {
                method: 'POST',
                headers: {
                    'Authorization': '',
                    'Accept': 'application/vnd.github.everest-preview+json',
                },
                body: JSON.stringify({
                    event_type: 'bombit',
                    client_payload: {
                        phone_number: phone,
                        count: count,
                        delay: delay
                    }
                })
            });

            if (bombingResponse.ok) {
                return 1;
            } else {
                return 0;
            }
        } catch (error) {
            return -1;
        }


    }
}