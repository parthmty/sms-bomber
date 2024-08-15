import httpx


class p_shemaroo_me:
    """
    Source: https://www.shemaroome.com/
    """

    def __init__(self):
        self.name = "shemaroo_me"
        self.url = "https://www.shemaroome.com/"

    def send(self, phone: str):
        url = "https://www.shemaroome.com/users/mobile_no_signup"

        payload = {"mobile_no": "+91" + phone}

        headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.shemaroome.com/",
            "Origin": "https://www.shemaroome.com",
        }

        try:
            response = httpx.post(url, headers=headers, data=payload, timeout=30.0)
            if response.status_code == 200 and response.json()["status"] == True:
                return 1
            else:
                return 0
        except:
            return -1
