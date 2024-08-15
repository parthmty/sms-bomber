import httpx


class p_zee5:
    """
    Source: https://www.zee5.com/
    """

    def __init__(self):
        self.name = "zee5"
        self.url = "https://www.zee5.com/"

    def send(self, phone: str):
        req_url = "https://auth.zee5.com/v1/user/sendotp"
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.zee5.com/",
            "device_id": "ltNspUZ2xmTTKiEu3Lsk000000000000",
            "esk": "bHROc3BVWjJ4bVRUS2lFdTNMc2swMDAwMDAwMDAwMDBfX2dCUWFaTGlOZEdOOVVzQ0taYWxvZ2h6OXQ5U3RXTFNEX18xNzA4NjIyNjI4MjE2",
            "Origin": "https://www.zee5.com",
        }
        body = {"phoneno": "91" + phone}

        try:
            r = httpx.post(req_url, headers=headers, json=body, timeout=30.0)
            if r.status_code == 200:
                return 1
            else:
                return 0
        except Exception as e:
            print(e)
            return -1
