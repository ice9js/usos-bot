HOSTNAME = "bot-node"
MEMORY   = 512

Vagrant.configure("2") do |config|
  config.vm.box = "chef/centos-7.0"

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--name", HOSTNAME, "--memory", MEMORY]
  end

  config.vm.network :private_network, ip: "192.168.1.100"

  config.vm.provision :ansible, run: "always" do |ansible|
    ansible.playbook = "ansible/playbooks.yml"
  end
end
