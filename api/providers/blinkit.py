import httpx


class p_blinkit:
    """
    Source: https://www.blinkit.com/
    """

    def __init__(self):
        self.name = "blinkit"
        self.url = "https://www.blinkit.com/"

    def send(self, phone: str):
        req_url = "https://blinkit.com/v2/accounts/"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.blinkit.com/",
            "auth_key": "c761ec3633c22afad934fb17a66385c1c06c5472b4898b866b7306186d0bb477",
            "Origin": "https://www.blinkit.com",
        }
        body = {"user_phone": phone}

        try:
            r = httpx.post(req_url, headers=headers, data=body, timeout=30.0)
            if r.status_code == 200:
                return 1
            else:
                return 0
        except:
            return -1
