---
id: vmware-virtualization
title: VMware Virtualization Basics
description: Practical guide to VMware products, ESXi vs vSphere vs Workstation, VM creation flow, and how lab network modes differ from vSphere networking.
slug: /virtualization/vmware-virtualization
sidebar_position: 2
status: reference
last_reviewed: 2026-03-23
keywords:
  - vmware
  - vsphere
  - esxi
  - workstation
  - bridged
  - nat
---

# VMware Virtualization Basics

VMware is a common virtualization ecosystem for both labs and production environments, but people often mix up the product names and networking models.

This guide separates the basics clearly.

## Core VMware products

| Product | What it is | Typical use |
| --- | --- | --- |
| VMware ESXi | Bare-metal hypervisor | Production hosts |
| VMware vCenter Server | Centralized management for ESXi hosts | Larger environments |
| VMware vSphere | The broader platform name around ESXi and vCenter | Enterprise virtualization stack |
| VMware Workstation | Desktop hypervisor | Labs and testing on a personal machine |

## Two different networking worlds

This is the part many beginners confuse.

### Workstation / desktop lab networking

In VMware Workstation, you commonly see these network modes:

- **Bridged**
- **NAT**
- **Host-Only**
- **Custom / vmnet**

These are convenient lab-oriented modes on a desktop hypervisor.

### ESXi / vSphere networking

In ESXi and vSphere environments, you usually work with:

- virtual switches
- port groups
- VLAN-backed networks
- uplinks to physical NICs

So “choose NAT or Host-Only in vSphere Client” is not the normal mental model for ESXi. That wording fits Workstation labs better.

## Common Workstation network modes

### Bridged

The VM appears directly on the physical network and usually gets an address from the same DHCP path as other devices on that network.

Use it when the VM should behave like a first-class device on the LAN.

### NAT

The VM uses a private network behind the host. The outside network mainly sees the host rather than the VM directly.

Use it when the VM needs outbound internet access but should stay less exposed.

### Host-Only

The VM talks to the host and possibly other host-only VMs, but not directly to the outside network.

Use it for isolated testing and safer labs.

### Custom

Custom networks let you map a VM to a chosen virtual network segment, which is useful for more complex lab design.

## Creating a VM in vSphere or ESXi

The high-level flow is usually:

1. Connect to ESXi or vCenter
2. Create a new virtual machine
3. Choose guest OS family and version
4. Assign CPU, RAM, and disk
5. Attach the VM to the correct port group or network
6. Mount the ISO or deployment source
7. Install the operating system

## Practical planning points

- choose ESXi/vSphere for production-style environments
- choose Workstation for fast personal labs
- treat snapshots as short-term rollback, not backup
- plan storage performance, not only CPU and RAM
- decide whether the VM should be bridged, NATed, isolated, or VLAN-attached before building the lab

## When VMware is a good fit

VMware is useful for:

- homelabs
- server consolidation
- multi-VM application testing
- admin and security labs
- production virtualization where the platform already exists

## Useful links

- vSphere documentation: [https://docs.vmware.com/en/VMware-vSphere/index.html](https://docs.vmware.com/en/VMware-vSphere/index.html)
- VMware Workstation documentation: [https://docs.vmware.com/en/VMware-Workstation-Pro/index.html](https://docs.vmware.com/en/VMware-Workstation-Pro/index.html)
