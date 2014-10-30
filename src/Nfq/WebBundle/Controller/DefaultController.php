<?php

namespace Nfq\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('NfqWebBundle:Default:index.html.twig');
    }
}
