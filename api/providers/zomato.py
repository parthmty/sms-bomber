import httpx


class p_zomato:
    """
    Source: https://www.zomato.com/
    """

    def __init__(self):
        self.name = "zomato"
        self.url = "https://www.zomato.com/"

    def send(self, phone: str):
        url = "https://accounts.zomato.com/login/phone"

        payload = {
            "country_id": "1",
            "number": phone,
            "type": "initiate",
            "lc": "7aa86cda47fc4176a55cd05db110debc",
            "verification_type": "sms",
        }
        headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
        }

        try:
            response = httpx.post(url, headers=headers, data=payload, timeout=30.0)
            if response.status_code == 200:
                if "exhausted" in response.json()["message"].lower():
                    return 0
                else:
                    return 1
        except:
            return -1
